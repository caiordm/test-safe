import type { Assignor } from "./authService";

export interface ProcedureCategory {
    id: number;
    name: string
}
export interface Procedure {
    id: number;
    name: string;
    description: string;
    price: number;
    isActive: boolean;
    category: ProcedureCategory;
    assignor: Assignor
}

export interface Procedures {
    procedure: Procedure;
    quantity: number
}

export interface PreRegisterDetails {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    status: string;
    assignor: Assignor;
    procedures: Procedures[];
    procedureFic: number,
    quantityProc: number
}

export async function getPreRegisterList(query: string): Promise<PreRegisterDetails[]> {
    const res = await fetch(`https://investm-backend-divine-field-7851.fly.dev/api/v1/pre-register/${query}`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${localStorage.accessToken}`}
    });

    console.log("chegou dentro do getPre")
    if (!res.ok) {
        throw new Error('Erro ao buscar dados dos pré-registros');
    }

    const data = await res.json()
    console.log(data)
    return await data as PreRegisterDetails[];
}

export async function getPreRegisterDetails(id: number): Promise<PreRegisterDetails> {
    const res = await fetch(`https://investm-backend-divine-field-7851.fly.dev/api/v1/pre-register/${id}`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${localStorage.accessToken}`}
    });

    if(!res.ok) {
        throw new Error("Erro ao buscar pré-registro")
    }

    return await res.json() as PreRegisterDetails;
}

export async function createPreRegister(preRegister: PreRegisterDetails): Promise<PreRegisterDetails> {
    const res = await fetch(`https://investm-backend-divine-field-7851.fly.dev/api/v1/pre-register/`, {
        method: "POST",
        headers: {"Authorization": `Bearer ${localStorage.accessToken}`, 'Content-Type': 'application/json'},
        body: JSON.stringify({
            "assignor": 3, // Clinica Integra
            "procedures": [
              {
                "procedure": preRegister.procedureFic,
                "quantity": preRegister.quantityProc
              }
            ],
            "name": preRegister.name,
            "email": preRegister.email,
            "cpf": preRegister.cpf,
            "phone": preRegister.phone,
            "status": "pending"
          }),
    });

    if (!res.ok) {
        throw new Error('Verifique se os campos de CPF e Telefone já existem, ou são inválidos.');
    }

    return await res.json() as PreRegisterDetails;
}

export async function updatePreRegister(preRegister: PreRegisterDetails): Promise<PreRegisterDetails> {
    const res = await fetch(`https://investm-backend-divine-field-7851.fly.dev/api/v1/pre-register/${preRegister.id}/`, {
        method: "PATCH",
        headers: {"Authorization": `Bearer ${localStorage.accessToken}`, 'Content-Type': 'application/json'},
        body: JSON.stringify({
            "assignor": 3, // Clinica Integra
            "name": preRegister.name,
            "email": preRegister.email,
            "cpf": preRegister.cpf,
            "phone": preRegister.phone,
            "status": preRegister.status
          }),
    });

    if (!res.ok) {
        throw new Error('Erro ao atualizar pré-registro');
    }

    return await res.json() as PreRegisterDetails;
}

export async function getAssignors(): Promise<Assignor[]> {
    const res = await fetch(`https://investm-backend-divine-field-7851.fly.dev/api/v1/assignor`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${localStorage.accessToken}`}
    });

    if (!res.ok) {
        throw new Error('Erro ao buscar cedentes');
    }

    const data = await res.json()
    console.log(data)
    return await data as Assignor[];
}

export async function getProcedures(): Promise<Procedure[]> {
    const res = await fetch(`https://investm-backend-divine-field-7851.fly.dev/api/v1/assignor/procedure`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${localStorage.accessToken}`}
    });

    if (!res.ok) {
        throw new Error('Erro ao buscar cedentes');
    }

    const data = await res.json()
    console.log(data)
    return await data as Procedure[];
}