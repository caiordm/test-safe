export interface Assignor {
    id: number,
    fantasy_name: string,
    cnpj: string,
    email: string,
    phone: string
}

export interface AuthResponse {
    access: string,
    refresh: string,
    username: string,
    assignor: Assignor
}


export async function login (username: string, password: string): Promise<AuthResponse> {
    const res = await fetch("https://investm-backend-divine-field-7851.fly.dev/api/v1/authentication/token/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
        mode: 'cors'
    });
    
    const data = await res.json();

    if(!res.ok) {
        throw new Error(data.detail)
    }


    console.log("RES.JSON>", data)

    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    localStorage.setItem('fantasyName', data.assignor.fantasy_name)

    return data as AuthResponse;
}

export function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('fantasyName')
}