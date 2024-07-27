export default function getUserInitials(firstName, lastName) {
    const firstInitial = firstName.match(/\b\w/g)[0].toUpperCase();
    const lastInitial = lastName.match(/\b\w/g)[0].toUpperCase();
    return `${firstInitial}${lastInitial}`;
  }