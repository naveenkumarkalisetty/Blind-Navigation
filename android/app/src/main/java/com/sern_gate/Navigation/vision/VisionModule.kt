package com.sern_gate.Navigation.vision

import android.util.Log
import com.facebook.react.bridge.*
import com.sern_gate.Navigation.vision.ImageUtils
import java.nio.ByteBuffer
import java.nio.ByteOrder

class VisionModule(private val context: ReactApplicationContext)
  : ReactContextBaseJavaModule(context) {

    private val detector = YoloV8Detector(context)

    override fun getName() = "VisionModule"

    @ReactMethod
    fun runDetection(image: ReadableArray, promise: Promise) {
        try {
            val bytes = ByteArray(image.size())
            for (i in 0 until image.size()) {
                bytes[i] = image.getInt(i).toByte()
            }

            val inputBuffer = ImageUtils.preprocess(bytes)
            val detected = detector.detect(inputBuffer)

            promise.resolve(detected)
        } catch (e: Exception) {
            promise.reject("DETECTION_ERROR", e)
        }
    }

    @ReactMethod
    fun testModel(promise: Promise) {
        Log.d("VisionModule", "testModel called")

        try {
            detector.isReady()
            promise.resolve("YOLO model ready")
        } catch (e: Exception) {
            promise.reject("MODEL_ERROR", e)
        }
    }
}
