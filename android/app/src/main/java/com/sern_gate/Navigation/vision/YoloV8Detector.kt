package com.sern_gate.Navigation.vision

import android.content.Context
import android.util.Log
import org.tensorflow.lite.Interpreter
import java.nio.ByteBuffer
import java.nio.ByteOrder

class YoloV8Detector(context: Context) {

    private val interpreter: Interpreter
    private val inputSize = 640
    private val numClasses = 80
    private val numPredictions = 8400

    private val vehicleClasses = setOf(1, 2, 3, 5, 7)

    init {
        try {
            val modelBytes = context.assets.open("yolov8n.tflite").readBytes()
            val buffer = ByteBuffer.allocateDirect(modelBytes.size)
            buffer.order(ByteOrder.nativeOrder())
            buffer.put(modelBytes)
            buffer.rewind()

            interpreter = Interpreter(buffer)

            Log.i("YOLO", "✅ YOLOv8 TFLite model loaded successfully")
        } catch (e: Exception) {
            Log.e("YOLO", "❌ Failed to load YOLO model", e)
            throw e
        }
    }

    fun isReady(): Boolean = true

    fun detect(input: ByteBuffer): Boolean {
        
        // TODO: Implement actual TFLite inference
        val output =
            Array(1) { Array(84) { FloatArray(numPredictions) } }
        // interpreter.run(...)
        interpreter.run(input, output)

        for (i in 0 until numPredictions) {
            var bestClass = -1
            var bestScore = 0f

            for (c in 4 until 84) {
                val score = output[0][c][i]
                if (score > bestScore) {
                    bestScore = score
                    bestClass = c - 4
                }
            }
            if (bestScore > 0.5f && vehicleClasses.contains(bestClass)) {
                Log.w("YOLO", "🚗 Vehicle detected: class=$bestClass score=$bestScore")
                return true
            }
        }
        return false
    }
}
