"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function ClientToast({ msg }: { msg: string }) {
  useEffect(() => {
    toast.error(msg);
  }, [msg]);

  return null;
}