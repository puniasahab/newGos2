import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { endPoints } from "./endpoints";
import { getDeviceId } from "./utils/deviceId";

const BASE_URL = import.meta.env.VITE_BASE_PUBLIC_URL;


const deviceId = getDeviceId();

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Device-ID": deviceId || "",
    },
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("authToken");
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if(error.response?.status === 401) {
            // Handle Unauthorized access
            localStorage.removeItem("authToken");
            // window.location.href = "/"; // Redirect to login page
        }
        return Promise.reject(error);
    }

);


export const loginApis = {
    sendOtp: async (mobile: string | null, email: string, referral_code: string): Promise<any> => {
       const response = await api.post(endPoints.sendOtp, {mobile, email, referral_code});
       return response.data;
    },
    verifyOtp: async (mobile: string, otp: string, tabSelected: string): Promise<any> => {
        const sendData = tabSelected === 'email' ? { email: mobile, otp } : { mobile, otp };
       const response = await api.post(endPoints.verifyOtp, sendData);
       return response.data;
    }
}

export const otpApis = {
    sendMobileOtp: async (mobile: string): Promise<any> => {
         const response = await api.post(endPoints.sendMobileOtp, {mobile});
         return response.data;
    },
    sendEmailOtp: async (email: string): Promise<any> => {  
        const response = await api.post(endPoints.sendEmailOtp, {email});
        return response.data;
   },
   verifyMobileOtp: async (mobile: string, otp: string): Promise<any> => {
        const response = await api.post(endPoints.verifyMobileOtp, {mobile, otp});
        return response.data;
   },
   verifyEmailOtp: async (email: string, otp: string): Promise<any> => {
        const response = await api.post(endPoints.verifyEmailOtp, {email, otp});
        return response.data;
   }
}

export const profileApi = {
    getProfileData: async(): Promise<any> => {
        const response = await api.get(endPoints.getProfileData);
        return response.data;
    },

    updateProfileData: async(data: any): Promise<any> => {
        const response = await api.post(endPoints.updateProfileData, data);
        return response.data;
    }
}


// export const leaderboardApi = {
//     fetchLeaderBoardResults: async (contestId: number, todayValue: boolean, allValue: boolean, monthlyValue: boolean, weeklyValue: boolean): Promise<any> => {
//         const response = await api.post(endPoints.getLeaderBoardResults,
//              {
//                 contest_id: contestId,
//                 today: new Boolean(todayValue),
//                 all: new Boolean(allValue),
//                 monthly: new Boolean(monthlyValue),
//                 weekly: new Boolean(weeklyValue)
//             }
//         )
//         return response.data;
//     }
// }


export const contests = {
    // fetching contests details to show on home page
    fetchContests: async () => {
        try {
            // const response = 
            const response = await api.get(endPoints.getContests);
            return response.data;
        } catch (error) {
            console.error("Error fetching contests:", error);
            throw error;
        }
    }

};



export const questionApis = {
    // fetching question for a particular contest 
    fetchQuestion: async (contest_id: number, isContestPlayed: boolean): Promise<any> => {
        try {
            const response = await api.post(endPoints.getQuestion, { contest_id, lang: 'en', play_again: isContestPlayed});
            // const response = await api.get(`${endPoints.questions}/${contestId}/${questionId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching question:", error);
            throw error;
        }
    },
    // submitting answer for a particular question

    submitAnswer: async (question_id: number, answer_status: number, type: string, contest_id?: number, duration?: number,) => {
        const contestType = type === "Rapid Fire" ? 'rpDuration' : 'ffDuration'; 
        try {
            const response = await api.post(endPoints.submitAnswer, { question_id, answer_status, contest_id, [contestType]: duration });
            // const response = await api.post(`${endPoints.submitAnswer}`, { contestId, questionId, answer });
            return response.data;
        } catch (error) {
            console.error("Error submitting answer:", error);
            throw error;
        }   
    },
};


export const leaderboardApi = {
    // fetching leaderboard results
    fetchLeaderboard: async (contestId: number, today: boolean, weekly: boolean, monthly: boolean, all: boolean) => {
        try {
            const response = await api.post(`${endPoints.getLeaderBoardResults}`, { contest_id: contestId, today, weekly, monthly, all });
            return response.data;
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
            throw error;
        }
    }
}

export default api;
