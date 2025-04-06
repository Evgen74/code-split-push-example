package com.codepush

import com.facebook.react.bridge.ReactApplicationContext
import java.io.File

object Execute {
    fun execute(path: String, reactContext: ReactApplicationContext) {
        val file = File(path)
        if (!file.exists()) {
            throw Exception("File does not exist at path: $path")
        }
        
        val catalystInstance = reactContext.catalystInstance
        catalystInstance?.let {
            it.loadScriptFromFile(path, path, false)
        } ?: throw Exception("CatalystInstance is not available")
    }
}