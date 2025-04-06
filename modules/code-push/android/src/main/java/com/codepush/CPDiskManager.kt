package com.codepush

import android.content.Context
import java.io.File
import java.io.FileOutputStream
import java.io.IOException

class CPDiskManager private constructor(private val context: Context) {

    companion object {
        @Volatile private var INSTANCE: CPDiskManager? = null

        fun getInstance(context: Context): CPDiskManager {
            return INSTANCE ?: synchronized(this) {
                INSTANCE ?: CPDiskManager(context).also { INSTANCE = it }
            }
        }
    }

    val bundleURL: String?
        get() {
            val homeBundle = homeBundlePath()
            return homeBundle?.absolutePath ?: null
        }

fun prepareCodeSplit(context: Context) {
    val rootAssetsPath = "bundles"
    val rootDestination = File(context.filesDir, "bundles")

    if (!rootDestination.exists()) {
        rootDestination.mkdirs()
    }

    copyAssetRecursively(context, rootAssetsPath, rootDestination)
}

private fun copyAssetRecursively(context: Context, assetPath: String, destDir: File) {
    val assetManager = context.assets
    val items = assetManager.list(assetPath) ?: return

    for (item in items) {
        val subPath = "$assetPath/$item"
        if (isAssetDirectory(context, subPath)) {
            if (item.matches(Regex("^drawable-.*dpi$"))) {
                val drawableDir = File(destDir, item)
                drawableDir.mkdirs()
                copyAssetFolder(context, subPath, drawableDir)
            } else {
                copyAssetRecursively(context, subPath, destDir)
            }
        } else {
            if (item.endsWith(".android.bundle")) {
                val outFile = File(destDir, item)
                copyAssetFile(context, subPath, outFile)
            }
        }
    }
}

private fun copyAssetFolder(context: Context, assetPath: String, destDir: File) {
    val assetManager = context.assets
    val items = assetManager.list(assetPath) ?: return

    for (item in items) {
        val subPath = "$assetPath/$item"
        if (isAssetDirectory(context, subPath)) {
            val subFolder = File(destDir, item)
            subFolder.mkdirs()
            copyAssetFolder(context, subPath, subFolder)
        } else {
            val outFile = File(destDir, item)
            copyAssetFile(context, subPath, outFile)
        }
    }
}

private fun isAssetDirectory(context: Context, assetPath: String): Boolean {
    return try {
        val assetManager = context.assets
        assetManager.list(assetPath)?.isNotEmpty() == true
    } catch (e: IOException) {
        false
    }
}

private fun copyAssetFile(context: Context, assetPath: String, destFile: File) {
    context.assets.open(assetPath).use { input ->
        FileOutputStream(destFile).use { output ->
            input.copyTo(output)
        }
    }
}

    fun homeBundlePath(): File? {
        val bundlesDir = File(context.filesDir, "bundles")
        if (bundlesDir.exists()) {
            bundlesDir.listFiles()?.forEach { file ->
                val fileName = file.name
                if (fileName.startsWith("home_") && fileName.endsWith(".android.bundle")) {
                    return file
                }
            }
        }
        return null
    }

    @Throws(IOException::class)
    private fun mergeAssetsRecursively(source: File, destination: File) {
        if (!destination.exists()) {
            destination.mkdirs()
        }
        source.listFiles()?.forEach { item ->
            val destItem = File(destination, item.name)
            if (item.isDirectory) {
                mergeAssetsRecursively(item, destItem)
            } else {
                if (destItem.exists()) {
                    destItem.delete()
                }
                item.renameTo(destItem)
            }
        }
        source.deleteRecursively()
    }
}