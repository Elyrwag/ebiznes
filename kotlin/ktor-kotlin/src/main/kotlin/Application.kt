package com.example

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.statement.*
import io.ktor.client.request.*
import io.ktor.server.application.*
import io.ktor.http.*
import kotlinx.coroutines.launch
import kotlinx.serialization.json.*

// ADD TOKENS TO YOUR ENVIRONMENT VARIABLES
val discordBotToken = System.getenv("DISCORD_BOT_TOKEN")
val slackBotToken = System.getenv("SLACK_BOT_TOKEN")
val slackWebSocketToken = System.getenv("SLACK_WEBSOCKET_TOKEN")

val cmds = arrayOf("help", "hello", "category", "products <category>")
val categories = arrayOf("category1", "category2", "category3")
val products = mapOf(
    "category1" to listOf("product1", "product2"),
    "category2" to listOf("product1", "product2", "product3", "product4"),
    "category3" to listOf("product1", "product2", "product3")
)

suspend fun getGatewayUrl(name: String, method: String, webUrl: String, authStr: String): String {
    val client = HttpClient(CIO)
    val response: HttpResponse = if (method == "GET") {
        client.get(webUrl) { headers { append(HttpHeaders.Authorization, authStr) } }
    } else if (method == "POST") {
        client.post(webUrl) { headers { append(HttpHeaders.Authorization, authStr) } }
    } else return "ERROR"

    if (response.status == HttpStatusCode.OK) {
        println("Received $name gateway response")
        val url = Json.parseToJsonElement(response.bodyAsText()).jsonObject["url"]?.jsonPrimitive?.content
        if (url == null) println("No url found") else return url
    }
    println("ERROR HTTP: ${response.status}")
    return "ERROR"
}

fun getRespondMessage(content: String, prefix: String = ""): String? {
    if (content == "${prefix}hello") { return "Hello :wave:!" }
    else if (content == "${prefix}category") { return "Categories: ${categories.joinToString(", ")}" }
    else if (content.startsWith("${prefix}products")) {
        val category = content.substringAfter(" ")
        val tmp = products[category]?.joinToString(", ")
        if (tmp != null) return "Products for $category: $tmp" else return "Category not found"
    }
    return null
}

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    configureSerialization()
    configureRouting()

    launch {
        connectToDiscord(
            getGatewayUrl(
                "Discord",
                "GET",
                "https://discord.com/api/v10/gateway",
                "Bot $discordBotToken"
            )
        )
    }

    launch {
        connectToSlack(
            getGatewayUrl(
                "Slack",
                "POST",
                "https://slack.com/api/apps.connections.open",
                "Bearer $slackWebSocketToken"
            )
        )
    }
}
