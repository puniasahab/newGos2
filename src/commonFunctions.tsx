export const setDeviceIdInLS = (deviceId: string) => {
    localStorage.setItem("deviceId", deviceId);
};

export const getDeviceIdFromLS = (): string | null => {
    return localStorage.getItem("deviceId");
};

export const setContestId = (contestId: number) => {
    localStorage.setItem("contestId", contestId.toString());
}

export const getContestId = (): number => {
    const contestId = localStorage.getItem("contestId");
    return contestId ? parseInt(contestId) : 0;
}
// export const setIsContestPlayed = (type: string | undefined, isPlayed: boolean | undefined) => {
//     localStorage.setItem(`is${type}Played`, JSON.stringify(isPlayed));
// }

// export const getIsContestPlayed = (type: string | undefined): { type: boolean } | null => {
//     const data = localStorage.getItem(`is${type}Played`);
//     return data ? JSON.parse(data) : null;
// }

export const setIsJackpotPlayed = (type: string | undefined, isPlayed: boolean | undefined) => {
    localStorage.setItem(`is${type}Played`, JSON.stringify(isPlayed));
}

export const setIsQuickFingerPlayed = (type: string | undefined, isPlayed: boolean | undefined) => {
    localStorage.setItem(`is${type}Played`, JSON.stringify(isPlayed));
}

export const setIsRapidFirePlayed = (type: string | undefined, isPlayed: boolean | undefined) => {
    localStorage.setItem(`is${type}Played`, JSON.stringify(isPlayed));
}

export const getIsJackpotPlayed = (type: string | undefined): { type: boolean } | null => {
    const data = localStorage.getItem(`is${type}Played`);
    return data ? JSON.parse(data) : null;
}

export const getIsQuickFingerPlayed = (type: string | undefined): { type: boolean } | null => {
    const data = localStorage.getItem(`is${type}Played`);
    return data ? JSON.parse(data) : null;
}

export const getIsRapidFirePlayed = (type: string | undefined): { type: boolean } | null => {
    const data = localStorage.getItem(`is${type}Played`);
    return data ? JSON.parse(data) : null;
}

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