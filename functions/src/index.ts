/* eslint-disable */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// Interface matching your frontend data structure
interface Evaluation {
    playerName: string;
    age: number;
    ratings: Record<string, number>;
    updatedAt: string;
    email: string;
}

export const analyzeImprovement = functions.firestore
    .document("evaluations/{docId}")
    .onCreate(async (snap, context) => {
        const newData = snap.data() as Evaluation;
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
            const previousEval = historyQuery.docs[0].data() as Evaluation;
            console.log(`Found previous evaluation at age ${previousEval.age}.`);

            const improvementStats: string[] = [];
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

        } catch (error) {
            console.error("Error analyzing improvement:", error);
            return null;
        }
    });

// Expose nothing else to avoid unused var warnings
