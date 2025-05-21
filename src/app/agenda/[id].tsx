// // src/app/agenda/novo/page.tsx
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";

// export default function NewAppointmentPage() {
//   const router = useRouter();
//   const [date, setDate] = useState("");
//   const [notes, setNotes] = useState("");
//   const [patientId, setPatientId] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setError(null);
//     if (!date || !patientId) {
//       setError("Data e ID do paciente são obrigatórios.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch("/api/appointments", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           date: new Date(date).toISOString(),
//           notes,
//           patientId: Number(patientId),
//         }),
//       });
//       if (!res.ok) throw new Error("Falha ao criar consulta.");
//       router.push("/agenda");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
//       <h1 className="text-2xl font-bold">Nova Consulta</n      <div>
//         <label className="block text-sm mb-1">Data e Hora</label>
//         <Input
//           type="datetime-local"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm mb-1">ID do Paciente</label>
//         <Input
//           type="number"
//           value={patientId}
//           onChange={(e) => setPatientId(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm mb-1">Notas (opcional)</label>
//         <Textarea
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//         />
//       </div>
//       {error && <p className="text-red-500">{error}</p>}
//       <Button type="submit" className="w-full" disabled={loading}>
//         {loading ? "Salvando..." : "Agendar Consulta"}
//       </Button>
//     </form>
//   );
// }
