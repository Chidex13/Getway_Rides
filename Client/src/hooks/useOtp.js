import { useState } from "react";
import { sendOtp, verifyOtp } from "../utils/api.js";

export function useOtp() {
    const [stage, setStage] = useState("idle");
    // idle | sending | sent | verifying | verified
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [verifying, setVerifying] = useState(false);

    const send = async (email) => {
        setSending(true);
        setError("");
        try {
            await sendOtp(email);
            setStage("sent");
        } catch (err) {
            setError(err.message);
            setStage("idle");
        } finally {
            setSending(false);
        }
    };

    const verify = async (email, code) => {
        setVerifying(true);
        setError("");
        try {
            await verifyOtp(email, code);
            setStage("verified");
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setVerifying(false);
        }
    };

    const reset = () => {
        setStage("idle");
        setError("");
    };

    return { stage, error, sending, verifying, send, verify, reset };
}