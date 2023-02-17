Set WshShell = CreateObject("WScript.Shell") 
WshShell.Run chr(34) & "C:\Sistema_Mantenimiento\Siconman\runSiconmanScript.bat" & Chr(34), 0
Set WshShell = Nothing