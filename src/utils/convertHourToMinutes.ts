export default function convertHourToMinutes(time: string){
    //Divide a strin e mapeia cada parte para valor inteiro
    const [hour, min] = time.split(':').map(Number);
    const timeInMinutes = (hour * 60) + min;

    return timeInMinutes;
};