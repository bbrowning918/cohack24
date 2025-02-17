import { NextApiRequest, NextApiResponse } from 'next';

import db  from '@/utils/supabaseUtil';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, otpCode } = req.body;

        const authUserId = await db.getAuthIdByEmail(email);

        const code = await db.getVerificationByAuthId(authUserId);

        if (code === otpCode) {
            
            res.status(200).json({ message: 'Verification successful' });
        } 

    }
}