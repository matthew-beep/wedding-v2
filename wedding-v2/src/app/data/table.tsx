'use client'
import React, { useEffect, useState } from 'react';
import CsvDownloadButton from 'react-json-to-csv';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../firebase';
import { LoaderCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TableProps {
}

interface RSVPDocument {
  id: string;
  firstName: string;
  lastName: string;
  attending: boolean;
  submitted: boolean;
}

interface RSVPAttending {
  id: string;
  firstName: string;
  lastName: string;
  attending: boolean;
  diet: string;
  email: string;
  text: string;
}

const Table: React.FC<TableProps> = ({ }) => {
  const [rsvpList, setRsvpList] = useState<RSVPDocument[]>([]); 
  const [attendingList, setAttendingList] = useState<RSVPAttending[]>([]); 
  const [attendanceNum, setAttendanceNum] = useState<number>(0);
  const [totalNum, setTotalNum] = useState<number>(0);

  // Use the query in useCollection (it will run the query every time it changes)
  const [value, loading] = useCollection(collection(db, 'rsvp'));
  const [attendingValue, attendingLoading] = useCollection(collection(db, 'attending'));

  useEffect(() => {
    if (value) {
      // Map the documents and set the rsvpList state
      const fetchedRsvpList: RSVPDocument[] = value.docs.map(doc => ({
         // Extract the document ID
        ...doc.data() as RSVPDocument, // Type assertion to RSVPDocument
        id: doc.id,
      }));
      // Update the state
      setRsvpList(fetchedRsvpList);
      setTotalNum(fetchedRsvpList.length);
    }
  }, [value]);

  useEffect(() => {
    if (attendingValue) {
      // Map the documents and set the rsvpList state
      const fetchedAttendingList: RSVPAttending[] = attendingValue.docs.map(doc => ({
         // Extract the document ID
        ...doc.data() as RSVPAttending, // Type assertion to RSVPDocument
        id: doc.id,
      }));
      // Update the state
      setAttendingList(fetchedAttendingList);
      setAttendanceNum(fetchedAttendingList.length);
    }
  }, [attendingValue]);
  

  useEffect(() => {
    console.log(rsvpList)
    //setFilter(rsvpList);
  }, [rsvpList])


  return (
    <div className="relative w-full text-black p-5 flex md:flex-row flex-col gap-5 justify-around">
      <div>
        {attendingLoading && 
          <div>
            <h2 className='font-proxima font-bold text-3xl'>Loading Attendance List</h2>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.1 }}>
              <motion.div
                className='w-auto flex items-center justify-center'
                animate={{rotate: 360}}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <LoaderCircle size={30}/>
              </motion.div>
            </motion.div>
          </div>
        }
        {attendingValue && 
          <div>
            <h2 className='font-proxima font-bold text-3xl'>Attending</h2>
            <table className='border-2'>
              <thead>
                <tr>
                  <th className='border-2 p-1'>First Name</th>
                  <th className='border-2 p-1'>Last Name</th>
                  <th className='border-2 p-1'>Email</th>
                  <th className='border-2 p-1'>Attending</th>
                  <th className='border-2 p-1'>Dietary Restrictions</th>
                  <th className='border-2 p-1'>Comments</th>
                </tr>
              </thead>
              <tbody>
                {attendingList.map((item, index) => (
                  <tr 
                    key={index} 
                    className='border-2'
                    style={{
                      backgroundColor: (index % 2 == 0) ? 'white' : 'lightgray',
                    }}
                  >
                    <td className='p-1'>{item.firstName}</td>
                    <td className='p-1'>{item.lastName}</td>
                    <td className='p-1'>{item.email}</td>
                    <td className='p-1'>{item.attending + " "}</td>
                    <td className='p-1'>{item.diet}</td>
                    <td className='p-1'>{item.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Total Attendees: {attendanceNum}</p>
            <button className='px-5 py-2 rounded-md font-proxima font-bold text-white bg-green-400 my-5'><CsvDownloadButton data={attendingList} /></button>
          </div>
        }
      </div> 
      <div>
      {loading && 
          <div>
            <h2 className='font-proxima font-bold text-3xl'>Loading Full List</h2>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.1 }}>
              <motion.div
                className='w-auto flex items-center justify-center'
                animate={{rotate: 360}}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <LoaderCircle size={30}/>
              </motion.div>
            </motion.div>
          </div>
        }
        {value &&
          <div>
            <h2 className='font-proxima font-bold text-3xl'>Full List</h2>
            <table className='border-2'>
              <thead>
                <tr>
                  <th className='border-2 p-1'>First Name</th>
                  <th className='border-2 p-1'>Last Name</th>
                  <th className='border-2 p-1'>Attending</th>
                  <th className='border-2 p-1'>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {rsvpList.map((item, index) => (
                  <tr 
                    key={index} 
                    className='border-2'
                    style={{
                      backgroundColor: (index % 2 == 0) ? 'white' : 'lightgray',
                    }}
                  >
                    <td className='p-1'>{item.firstName}</td>
                    <td className='p-1'>{item.lastName}</td>
                    <td className='p-1'>{item.attending + " "}</td>
                    <td className='p-1'>{item.submitted + " "}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Total Invites: {totalNum}</p>
          </div>
        }
      </div>
    </div>
  );
}

export default Table;