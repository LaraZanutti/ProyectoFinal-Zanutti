const armasDisponibles = async () => {
    const resp = await fetch('/JSON/data.json')
    const data = await resp.json()

    return data
}