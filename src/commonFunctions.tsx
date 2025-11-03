export const setDeviceIdInLS = (deviceId: string) => {
    localStorage.setItem("deviceId", deviceId);
};

export const getDeviceIdFromLS = (): string | null => {
    return localStorage.getItem("deviceId");
};


export const setNameAndContestIdInLS = (nameAndContestId: { name: string; contestId: number }[]) => {
    localStorage.setItem("nameAndContestId", JSON.stringify(nameAndContestId));
}
export const getNameAndContestId = () => {
    const data = localStorage.getItem("nameAndContestId");
    return data ? JSON.parse(data) : [];
};


export const setPhoneNumberInLS = (phoneNumber: string) => {
    localStorage.setItem("phoneNumber", phoneNumber);
}

export const getPhoneNumberFromLS = (): string | null => {
    return localStorage.getItem("phoneNumber");
}

export const setAuthTokenInLS = (token: string) => {
    localStorage.setItem("authToken", token);
} 

export const getAuthTokenFromLS = (): string | null => {
    return localStorage.getItem("authToken");
}

export const removeAuthTokenFromLS = () => {
    localStorage.removeItem("authToken");
}

export const clearAllLS = () => {
    localStorage.clear();
}

export const removePhoneNumberFromLS = () => {
    localStorage.removeItem("phoneNumber");
}