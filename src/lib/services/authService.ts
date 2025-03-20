export interface AuthResponse {
    access_token: string,
    refresh_token: string,
    username: string,
    assignor: object
}


export async function login (username: string, password: string): Promise<AuthResponse> {
    const res = await fetch("https://investm-backend-divine-field-7851.fly.dev/api/v1/authentication/token/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
        mode: 'cors'
    });
    
    if(!res.ok) {
        throw new Error("Incapaz de fazer o login")
    }

    console.log("RES.JSON>",res.json())
    const data = await res.json() as AuthResponse;
    console.log("DATA.ASSIGNOR>", data.assignor)
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);

    return data;
}

export function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}