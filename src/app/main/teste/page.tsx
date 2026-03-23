"use server";

import ClientToast from "./client-toast";

export default async function Page() {
  let success: boolean = true;
  async function vai(form: FormData) {
    "use server";
    const msg = form.get('text') as string;
    return;
  }

  return (
    <main>
      <h1>Minha página</h1>
      <form action={vai}>
        <input name="text" type="text" />
        <button>OK</button>
      </form>
      <ClientToast msg={msg} />
    </main>
  );
}