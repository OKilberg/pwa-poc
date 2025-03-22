import { utils, writeFileXLSX } from "xlsx"
import { getRecordsByMonthYear } from "../db/logs"
import { getEmployeesMap } from "../db/users"

export const exportMonthlyLogsToXLSX =async (year: number, month: number)=>{
    const employeesMap = await getEmployeesMap()
    const monthlyLogs = await getRecordsByMonthYear(year, month)

    const workbook = utils.book_new();

    const logsWithEmployeeInfo = monthlyLogs.map(
        log => {
            const employee = employeesMap.get(log.userId)
            if (!employee) return;
            const {firstName, lastName, idn} = employee;
            return {
                idn,
                firstName,
                lastName,
                ...log
            }
        }
    )

    const logsSheet = utils.json_to_sheet(logsWithEmployeeInfo)

    utils.book_append_sheet(workbook, logsSheet, "Work logs")

    const fileName = `WorkLogExport${year}-${month+1}.xlsx`

    writeFileXLSX(workbook, fileName)
}