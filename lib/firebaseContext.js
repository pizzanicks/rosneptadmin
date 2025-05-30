import { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, doc, query, where, getDocs, getDoc, setDoc } from 'firebase/firestore';
import db, { auth } from './firebase';

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [inactivity, setInactivity] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [allHistory, setAllHistory] = useState([]);
    const [allDepositReq, setAllDepositReq] = useState([]);
    const [allWithdrawReq, setAllWithdrawReq] = useState([]);
    const [allInvestments, setAllInvestments] = useState([]);
    const [kycRequests, setKycRequests] = useState([]);
    const [supportTickets, setSupportTickets] = useState([]);

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const token = await user.getIdToken();
                    setUserId(user.uid);
                    setUserToken(token);
                    setIsAuthenticated(true); // User is authenticated

                } catch (error) {
                    console.error("Error getting user token:", error);
                    setUserId(null);
                    setIsAuthenticated(false); // Authentication failed
                }
            } else {
                setUserId(null);
                setIsAuthenticated(false); // No authenticated user
                // console.log("No authenticated user");
            }
        });

        let logoutTimer;

        const startLogoutTimer = () => {
            logoutTimer = setTimeout(() => {
                // Log out the user after 30 minutes of inactivity
                logoutUser();
            }, 30 * 60 * 1000); // 30 minutes in milliseconds
        };

        const resetLogoutTimer = () => {
            clearTimeout(logoutTimer);
            startLogoutTimer();
        };

        if (userId) {
            startLogoutTimer();
        }

        // Add event listeners for user activity
        const handleUserActivity = () => {
            resetLogoutTimer();
        };

        // Listen for mouse movement and keypress events
        document.addEventListener('mousemove', handleUserActivity);
        document.addEventListener('keydown', handleUserActivity);

        return () => {
            clearTimeout(logoutTimer);
            unsubscribeAuth();
            // Remove event listeners on component unmount
            document.removeEventListener('mousemove', handleUserActivity);
            document.removeEventListener('keydown', handleUserActivity);
        };
    }, [userId]);

    const logoutUser = () => {
        auth.signOut().then(() => {
            // console.log("User logged out due to inactivity");
            setInactivity(true);
            setIsAuthenticated(false); // User logged out
            setTimeout(() => {
                setInactivity(false);
            }, 3000);
        }).catch((error) => {
            console.error("Error logging out:", error);
        });
    };

    useEffect(() => {
        if (userId) {

            const usersCollectionRef = collection(db, "USERS");

            // FETCH ALL USERS
            const unsubscribeSnapshot1 = onSnapshot(
                usersCollectionRef,
                async (snapshot) => {
                  const usersData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                  }));
            
                  setAllUsers(usersData);
                  console.log("All users:", usersData);
            
                  for (const user of usersData) {
                    const userRef = doc(db, "allUsers", user.id);
                    await setDoc(userRef, user, { merge: true });
                  }
                },
                (error) => {
                  console.error("Error fetching all users:", error);
                }
            );            

            const allHistoryCollectionRef = collection(db, "ALLHISTORY");
            
            // FETCH ALL TRANSACTIONS
            const unsubscribeSnapshot2 = onSnapshot(
            allHistoryCollectionRef,
            (snapshot) => {
                const historyArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));

                setAllHistory(historyArray);
                console.log("All history from ALLHISTORY:", historyArray);
            },
            (error) => {
                console.error("Error fetching ALLHISTORY:", error);
            }

            );

            const depositRequestCollectionRef = collection(db, "DEPOSITREQUEST");
            
            // FETCH ALL TRANSACTIONS
            const unsubscribeSnapshot3 = onSnapshot(
                depositRequestCollectionRef,
                (snapshot) => {
                const depositArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setAllDepositReq(depositArray);
                console.log("All deposit requests:", depositArray);
                },
                (error) => {
                console.error("Error fetching DEPOSITREQUEST:", error);
            })

            const withdrawRequestCollectionRef = collection(db, "WITHDRAWREQUEST");

            // FETCH ALL WITHDRAWAL TRANSACTIONS
            const unsubscribeSnapshot4 = onSnapshot(
            withdrawRequestCollectionRef,
            (snapshot) => {
                const withdrawalArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));

                setAllWithdrawReq(withdrawalArray); // Assuming you have this state
                console.log("All withdrawal requests:", withdrawalArray);
            },
            (error) => {
                console.error("Error fetching WITHDRAWREQUEST:", error);
            }
            );

            const investmentCollectionRef = collection(db, "INVESTMENT");

            // FETCH ALL INVESTMENT DATA
            const unsubscribeSnapshot5 = onSnapshot(
            investmentCollectionRef,
            (snapshot) => {
                const investmentArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));

                setAllInvestments(investmentArray);
                console.log("All investment records:", investmentArray);
            },
            (error) => {
                console.error("Error fetching INVESTMENT:", error);
            }
            );

            
            const kycRequestRef = collection(db, "CUSTOMERKYC");

            // KYC REQUESTS
            const unsubscribeSnapshot6 = onSnapshot(
            kycRequestRef,
            (querySnapshot) => {
                const requests = [];
                querySnapshot.forEach((docSnapshot) => {
                requests.push({ id: docSnapshot.id, ...docSnapshot.data() });
                });

                setKycRequests(requests);
                console.log("KYC Requests:", requests);
            },
            (error) => {
                console.error("Error fetching KYC requests:", error);
            }
            );


            const supportTicketsRef = collection(db, "CUSTOMERTICKETS");

            // SUPPORT TICKETS
            const unsubscribeSnapshot7 = onSnapshot(
              supportTicketsRef,
              (querySnapshot) => {
                const tickets = [];
                querySnapshot.forEach((docSnapshot) => {
                  tickets.push({ id: docSnapshot.id, ...docSnapshot.data() });
                });

                setSupportTickets(tickets);
                console.log("Support Tickets:", tickets);
              },
              (error) => {
                console.error("Error fetching support tickets:", error);
              }
            );


            return () => {
                unsubscribeSnapshot1();
                unsubscribeSnapshot2();
                unsubscribeSnapshot3();
                unsubscribeSnapshot4();
                unsubscribeSnapshot5();
                unsubscribeSnapshot6();
                unsubscribeSnapshot7();
            };
        }
    }, [userId]);

    return (
      <FirebaseContext.Provider
        value={{
          userToken,
          inactivity,
          isAuthenticated,
          allUsers,
          allHistory,
          allDepositReq,
          allWithdrawReq,
          allInvestments,
          kycRequests,
          supportTickets,
        }}
      >
        {children}
      </FirebaseContext.Provider>
    );
};