export const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  export const getEventStatus = (startDate, endDate) => {
    const now = new Date();
    const eventStart = new Date(startDate);
    const eventEnd = endDate ? new Date(endDate) : new Date(eventStart);
    
    // Add 24 hours to end date if it's the same as start date
    if (eventEnd.getTime() === eventStart.getTime()) {
      eventEnd.setHours(eventEnd.getHours() + 24);
    }
    
    if (now < eventStart) {
      return 'upcoming';
    } else if (now >= eventStart && now <= eventEnd) {
      return 'current';
    } else {
      return 'past';
    }
  };
  