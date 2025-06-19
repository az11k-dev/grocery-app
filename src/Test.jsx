import { useState } from "react";
import { supabase } from "./lib/supabaseClient";

export default function Test() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);



    // 🔼 called when the user clicks “Upload”
    const handleUpload = async () => {
        const { data, error } = await supabase.storage.createBucket("slider-images", {
            public: true, // или false для приватного
            allowedMimeTypes: ["image/png", "image/jpeg"],
            fileSizeLimit: 5 * 1024 * 1024, // 5MB
        });

        if (error) {
            console.error("❌ Failed to create bucket:", error.message);
        } else {
            console.log("✅ Bucket created:", data);
        }
        if (!file) return;

        setUploading(true);
        try {
            // unique name prevents collisions
            const ext = file.name.split(".").pop();
            const fileName = `${Date.now()}.${ext}`;

            const { data, error } = await supabase.storage
                .from("slider-images")
                .upload(fileName, file, {
                    contentType: file.type,
                    cacheControl: "3600",
                    upsert: false, // flip to true if you’d rather overwrite
                });

            if (error) throw error;

            // (optional) make it easy to display the image later
            const { data: publicUrl } = supabase.storage
                .from("slider-images")
                .getPublicUrl(fileName);

            console.log("✔ Uploaded", data, publicUrl);
        } catch (err) {
            console.error("❌ Upload failed:", err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-5 space-y-4 text-white">
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />

            <button
                className="rounded bg-emerald-600 px-4 py-2 disabled:opacity-50"
                disabled={!file || uploading}
                onClick={handleUpload}
            >
                {uploading ? "Uploading…" : "Upload"}
            </button>
        </div>
    );
}
