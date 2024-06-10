
export const dateToString =(eventDate:Date)=>{
 return new Date(eventDate).toLocaleString().slice(0,10)
}



export const dayNames = [
    { id: 1, name: "Пондельник" },
    { id: 2, name: "Вторник" },
    { id: 3, name: "Среда" },
    { id: 4, name: "Четверг" },
    { id: 5, name: "Пятница" },
    { id: 6, name: "Суббота" },
    { id: 0, name: "Воскресенье" },
  ];

export  const monthNames = [
    { id: 1, name: "Январь" },
    { id: 2, name: "Февраль" },
    { id: 3, name: "Март" },
    { id: 4, name: "Апрель" },
    { id: 5, name: "Май" },
    { id: 6, name: "Июнь" },
    { id: 7, name: "Июль" },
    { id: 8, name: "Август" },
    { id: 9, name: "Сентябрь" },
    { id: 10, name: "Октябрь" },
    { id: 11, name: "Ноябрь" },
    { id: 12, name: "Декабрь" },
  ];