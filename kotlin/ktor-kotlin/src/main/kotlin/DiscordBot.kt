package com.example

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.websocket.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.websocket.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.serialization.*
import kotlinx.serialization.json.*

val discordPrefix = "!"

@Serializable
data class DiscordMessage(
    val t: String?,
    val s: Int?,
    val op: Int,
    val d: JsonObject?
)

fun parseDiscordMessage(jsonMessage: String): DiscordMessage {
    return Json.decodeFromString(jsonMessage)
}

suspend fun DefaultWebSocketSession.identifyBot() {
    val identifyMessage = """
            {
                "op": 2,
                "d": {
                    "token": "$discordBotToken",
                    "intents": 513,
                    "properties": {
                        "os": "linux",
                        "browser": "ktor",
                        "device": "ktor"
                    }
                }
            }
        """.trimIndent()
    send(identifyMessage)
}

suspend fun reactToMessage(client: HttpClient, content: String, channelId: String) {
    val url = "https://discord.com/api/v10/channels/$channelId/messages"
    println("Received message: $content")

    // { "$prefix$it" } adds $prefix before every element from array
    val message = if (content == "${discordPrefix}help") {
        "Available commands:\\n${cmds.joinToString("\\n") { "$discordPrefix$it" }}"
    } else getRespondMessage(content, discordPrefix)

    if (message != null) sendMessage(client, url, discordBotToken, message)
}

suspend fun sendMessage(client: HttpClient, webUrl: String, botToken: String, message: String) {
    val response: HttpResponse = client.post(webUrl) {
        headers { append(HttpHeaders.Authorization, "Bot $botToken") }
        contentType(ContentType.Application.Json)
        setBody("""{"content":"$message"}""")
    }
    println("Message status: ${response.status}")
}

suspend fun connectToDiscord(gatewayUrl: String) {
    val client = HttpClient(CIO) { install(WebSockets) }

    if (gatewayUrl != "ERROR") {
        client.webSocket(gatewayUrl) {
            val heartbeat = Frame.Text("""{"op": 1, "d": "null"}""")
            var firstACK = true
            var ack: Boolean
            var noException = true

            try {
                while (noException) {
                    val frame = incoming.receive()
                    if (frame is Frame.Text) {
                        val message = frame.readText()
                        println(">>>            Received message from Discord: $message")
                        val parsedJson = parseDiscordMessage(message)
                        when (parsedJson.op) {
                            10 -> {
                                identifyBot()

                                val heartbeat_interval = parsedJson.d!!.jsonObject["heartbeat_interval"]?.jsonPrimitive?.long
                                if (heartbeat_interval != null) {
                                    launch {
                                        delay(10_000L) // 10 seconds
                                        while (noException) {
                                            send(heartbeat)
                                            ack = false
                                            delay(heartbeat_interval)

                                            if (!ack) {
                                                print("Connection lost")
                                                noException = false
                                            }
                                        }
                                    }
                                } else println("Missing heartbeat_interval!")
                            }

                            1 -> { send(heartbeat) }

                            11 -> {
                                if (firstACK) {
                                    println("Received first HeartBeatACK successfully")
                                    firstACK = false
                                }
                                ack = true
                            }

                            0 -> {
                                when (parsedJson.t) {
                                    "READY" -> { println("Ready to work!") }

                                    "MESSAGE_CREATE" -> {
                                        val content = parsedJson.d!!.jsonObject["content"]?.jsonPrimitive?.content
                                        val channelId = parsedJson.d.jsonObject["channel_id"]?.jsonPrimitive?.content

                                        if (channelId != null && content != null) reactToMessage(client, content, channelId)
                                    }

                                    else -> { println("t is unknown: ${parsedJson.t}") }
                                }
                            }

                            else -> { println("Unknown op") }
                        }
                    }
                }
            } catch (e: Exception) {
                println("Exception: $e")
                print("Closing application...")
                noException = false
            } finally { close() }
        }
        client.close()
    }
    print("DISCORD BOT DISCONNECTED")
}