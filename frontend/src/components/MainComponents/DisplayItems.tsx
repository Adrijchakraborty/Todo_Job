import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Props {
    title: string;
    company: string;
    description: string;
    dueDate: Date;
    link: string;
    remarks?: string;
    status: 'To Do' | 'In Progress' | 'Completed' | 'Blocked';
}

const DisplayItems: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [jobData, setJobData] = useState<Props[] | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                await axios.get("/api/job")
                    .then((res) => {
                        setJobData(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchJobs();
    }, [])
    console.log(jobData);
    return (
        <div className='border grid grid-cols-1 lg:grid-cols-3 h-full'>

        </div>
    )
}

export default DisplayItems