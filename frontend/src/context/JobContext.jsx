import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchJobs = async (keyword = '', location = '', category = '') => {
        setLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:5000/api/jobs?keyword=${keyword}&location=${location}&category=${category}`);
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <JobContext.Provider value={{ jobs, fetchJobs, loading }}>
            {children}
        </JobContext.Provider>
    );
};
