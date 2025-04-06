package com.codepush

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class CodePushModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val diskManager: CPDiskManager = CPDiskManager.getInstance(reactContext)

    init {
        diskManager.prepareCodeSplit(reactContext)
    }

    override fun getName(): String = "CodePush"

    @ReactMethod
    fun execute(path: String, promise: Promise) {
        try {
            Execute.execute(path, reactApplicationContext)
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("EXECUTE_ERROR", e)
        }
    }

}