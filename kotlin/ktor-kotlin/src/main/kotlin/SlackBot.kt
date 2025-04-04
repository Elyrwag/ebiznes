package com.example

import com.slack.api.Slack
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.websocket.*
import io.ktor.websocket.*
import kotlinx.serialization.json.*

fun sendMessage(slack: Slack, message: String) {
    slack.methods(slackBotToken).chatPostMessage { it.channel("#bot-test").text(message) }
}

suspend fun connectToSlack(gatewayUrl: String) {
    val client = HttpClient(CIO) { install(WebSockets) }

    if (gatewayUrl != "ERROR") {
        client.webSocket(gatewayUrl) {
            val slack = Slack.getInstance()

            try {
                while (true) {
                    val frame = incoming.receive()
                    if (frame is Frame.Text) {
                        val message = frame.readText()
                        println(">>>            Received message from Slack: $message")

                        val event = Json.parseToJsonElement(message).jsonObject
                        if (event["type"]?.jsonPrimitive?.content == "hello") println("Slack WebSocket connected successfully!")
                        else {
                            val payloadEvent = event["payload"]!!.jsonObject["event"]?.jsonObject
                            if (payloadEvent?.get("type")?.jsonPrimitive?.content == "app_mention" && event["retry_reason"]?.jsonPrimitive?.content != "timeout") {
                                val content = payloadEvent["text"]?.jsonPrimitive?.content
                                val text = content?.substringAfter(" ")
                                val helpMsg = "Available commands:\n${cmds.joinToString("\n")}"

                                val msg = if (text == "help") helpMsg else getRespondMessage(text!!)
                                if (msg != null) sendMessage(slack, msg) else sendMessage(slack, helpMsg)
                            }
                        }
                    } else println("Unknown frame")
                }
            } catch (e: Exception) {
                println("Exception: $e")
                print("Closing application...")
            } finally { close() }
        }
        client.close()
    }
    print("SLACK BOT DISCONNECTED")
}