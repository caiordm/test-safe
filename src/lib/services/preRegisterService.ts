export interface PreRegisterDetails {
    id: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    status: string;
}

export async function getPreRegisterList(): Promise<PreRegisterDetails[]> {
    const res = await fetch(`https://investm-backend-divine-field-7851.fly.dev/api/v1/pre-register`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${localStorage.accessToken}`}
    });

    if (!res.ok) {
        throw new Error('Erro ao buscar dados dos pré-registros');
    }

    console.log(res.json());
    return await res.json() as PreRegisterDetails[];
}

export async function getPreRegisterDetails(id: string): Promise<PreRegisterDetails> {
    const res = await fetch(`/api/pre-register/${id}`);

    if (!res.ok) {
        throw new Error('Erro ao buscar dados do pré-registro');
    }

    return await res.json() as PreRegisterDetails;
}
