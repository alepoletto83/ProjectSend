export default function NewSessionPage() {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold mb-6">Nova sessão</h1>

      <form className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm">Data</span>
          <input
            type="date"
            name="date"
            defaultValue={today}
            required
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Tipo</span>
          <select name="type" required className="border rounded px-3 py-2">
            <option value="climb">climb</option>
            <option value="hangboard">hangboard</option>
            <option value="strength">strength</option>
            <option value="mobility">mobility</option>
            <option value="bjj">bjj</option>
            <option value="rest">rest</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Local</span>
          <select name="location" className="border rounded px-3 py-2">
            <option value="">—</option>
            <option value="home">home</option>
            <option value="groundup">groundup</option>
            <option value="outdoor">outdoor</option>
            <option value="other">other</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Duração (min)</span>
          <input
            type="number"
            name="duration_min"
            min={0}
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">RPE (1–10)</span>
          <input
            type="number"
            name="rpe"
            min={1}
            max={10}
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">% completo (0–100)</span>
          <input
            type="number"
            name="completion_pct"
            min={0}
            max={100}
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Notas</span>
          <textarea
            name="notes"
            rows={4}
            className="border rounded px-3 py-2"
          />
        </label>

        <button
          type="submit"
          className="bg-black text-white rounded px-4 py-2 mt-2"
        >
          Salvar
        </button>
      </form>
    </main>
  );
}
