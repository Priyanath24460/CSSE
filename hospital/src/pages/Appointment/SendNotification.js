import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Database/FireBaseConfig'; // Firestore config

// This is a mock function for sending notifications
export const sendNotification = async (userId, message) => {
  // Fetch user data (e.g., email, mobile) for sending notifications
  const userDoc = await getDoc(doc(db, 'patients', userId));
  if (userDoc.exists()) {
    const userData = userDoc.data();
    console.log(`Sending notification to ${userData.name} (${userData.mobileNumber}): ${message}`);

    // Integrate your actual notification logic here (e.g., email, SMS, push notification)
    alert(`Notification sent to ${userData.name}: ${message}`);
  } else {
    console.error('No such user found');
  }
};

export default sendNotification;