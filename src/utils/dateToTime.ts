export const timeSince = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) return "Há " + Math.floor(interval) + " anos";

    interval = seconds / 2592000;
    if (interval > 1) return "Há " + Math.floor(interval) + " meses";

    interval = seconds / 86400;
    if (interval > 1) return "Há " + Math.floor(interval) + " dias";

    interval = seconds / 3600;
    if (interval > 1) return "Há " + Math.floor(interval) + " horas";

    interval = seconds / 60;
    if (interval > 1) return "Há " + Math.floor(interval) + " minutos";

    return "Há " + Math.floor(seconds) + " segundos";
};