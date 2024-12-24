import type { NextApiRequest, NextApiResponse } from "next";

import db from "@/utils/supabaseUtil";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {

        try {
            const { firstName, email, occupation, goal, emailFrequency } = req.body;
            const addedProfile = await db.addProfile(firstName, email, occupation, goal, emailFrequency);
            console.log("Added Profile: ", addedProfile);
            res.status(200).json({ success: true, data: addedProfile });
        }
        catch (error) {
            console.error("Error Adding Profile: ", error);
            res.status(500).json({ success: false, error: "Error Adding Profile" });
        }
    }
}