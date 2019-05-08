export const emailExp = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
export const nameExp = /^([a-zA-Z ]){2,30}$/;

// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.
export const passwordExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
