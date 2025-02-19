import { WorkScheduleDay } from "../models/work-schedule-day.model";
import { WorkSheduleRow } from "../models/work-shedule-row.model";

export namespace RandomUtils {

    export const workNames = ["Лёха (потолок)", "Саша Белый", "Генадий Полушубок", "Валера Заземлитель", "Олег", "Константин", "Алексей", "Иван", "Михаил", "Дмитрий", "Евгений", "Сергей", "Андрей", "Пётр", "Владимир", "Денис", "Анна", "Мария", "Екатерина", "Исрапил", "Бутан", "Вазген", "Виктор Корнеплод"];
    // export const departmentNames = ["Отдел Дежавю", "Отдел жертвоприношений", "Отдел боевых исскуств", "Отдел промышленного шпионажа", "Отдел тактического отравления", "Отдел импровизации", "Отдел поклонения Перуну", "Отдел распития алкогольных напитков", "Отдел счастья", "Отдел помощи жертвам венерических заболеваний", "Отдел тайн", "Отдел воровства бюджета", "Отдел борьбы с рабочей романтикой"]
    export const departmentNames = ["Отдел Польши", "Отдел совета безопасности Нигерии"];
    
    export function randomLitter(): string {
        const l = ["У", "В"];
        return l[Math.round(Math.random())];
    }
    
    export function randomIntFromInterval(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    function cheatRandomDayOff(attempts: number = 9): number {
        for (let i = 0; i < attempts; i++) {
            const randomDayOff = randomIntFromInterval(0,4);
            if (randomDayOff === 4) {
                return randomDayOff;
            }
        }
        return randomIntFromInterval(0,4);
    }

    export function randomDay(day_count: number, depID: number): WorkScheduleDay {
        return {
            id: day_count,
            shift: randomLitter() + randomIntFromInterval(1,8).toString(),
            date: day_count.toString(),
            dayOffType: cheatRandomDayOff(11),
            departmentId: depID
        }
    }

    export function randomWorkScheduleRow(workersCount: number): WorkSheduleRow {
        const departmentId = randomIntFromInterval(0,departmentNames.length-1);
        const department = departmentNames[departmentId];
        const employeeId = workersCount;
        const employee = workNames[randomIntFromInterval(0, workNames.length-1)];
        const employeeStatus = randomIntFromInterval(0,1);
        const collection = [];
        for (let i = 0; i <= 31; i++) {
            collection.push(randomDay(i, departmentId));
        }
        return {
            departmentId: departmentId,
            department: department,
            employeeId: employeeId,
            employee: employee,
            employeeStatus: employeeStatus,
            collection: collection
        }
    }
}