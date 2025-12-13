"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeImprovement = void 0;
/* eslint-disable */
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
admin.initializeApp();
const db = admin.firestore();
exports.analyzeImprovement = functions.firestore
    .document("evaluations/{docId}")
    .onCreate(async (snap, context) => {
    const newData = snap.data();
    const { playerName, age } = newData;
    console.log(`New evaluation for ${playerName} (Age: ${age}). Starting analysis...`);
    try {
        // 1. Query for PREVIOUS evaluations for this player
        // We assume historical data is present. 
        // Note: In a real app, you might want to order by date.
        const historyQuery = await db
            .collection("evaluations")
            .where("playerName", "==", playerName)
            .where("age", "<", age) // Get younger ages
            .orderBy("age", "desc")
            .get();
        if (historyQuery.empty) {
            console.log(`No historical data found for ${playerName}. This is the first evaluation.`);
            // Optional: Send "Welcome / First Eval" email
            return null;
        }
        // 2. Compare Data
        const previousEval = historyQuery.docs[0].data();
        console.log(`Found previous evaluation at age ${previousEval.age}.`);
        const improvementStats = [];
        let totalImprovement = 0;
        for (const [metricKey, newValue] of Object.entries(newData.ratings)) {
            const oldValue = previousEval.ratings[metricKey] || 0;
            const diff = newValue - oldValue;
            if (diff !== 0) {
                improvementStats.push(`${metricKey}: ${oldValue} -> ${newValue} (${diff > 0 ? '+' : ''}${diff})`);
                totalImprovement += diff;
            }
        }
        console.log("Improvement Stats:", improvementStats);
        // 3. Save Summary
        await db.collection("evaluation_summaries").add({
            playerId: context.params.docId,
            playerName,
            improvementStats,
            totalImprovement,
            generatedAt: admin.firestore.FieldValue.serverTimestamp(),
            message: `Graph generation complete. User improved by ${totalImprovement} points total.`
        });
        console.log("Analysis complete. Summary saved.");
        return null;
    }
    catch (error) {
        console.error("Error analyzing improvement:", error);
        return null;
    }
});
// Expose nothing else to avoid unused var warnings
//# sourceMappingURL=index.js.map