import { supabase } from "./supabase.service.js";

const BUCKET = "receipts";

/**
 * Upload a receipt file to Supabase Storage.
 * Returns the public URL of the uploaded file.
 */
export const uploadReceipt = async (file, fullName) => {
  const ext      = file.originalname.split(".").pop();
  const filename = `${fullName.replace(/\s+/g, "_")}_${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, file.buffer, {
      contentType: file.mimetype,
      upsert:      false,
    });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return data.publicUrl;
};