$DatabasePath = Join-Path $PSScriptRoot "db.accdb"
$ExportFolder = Join-Path $PSScriptRoot "csv_export"
if (-not (Test-Path $ExportFolder)) { New-Item -ItemType Directory -Path $ExportFolder | Out-Null }

$ConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=$DatabasePath;Persist Security Info=False;"
$Connection = New-Object System.Data.OleDb.OleDbConnection($ConnectionString)

try {
    $Connection.Open()
    $Schema = $Connection.GetOleDbSchemaTable([System.Data.OleDb.OleDbSchemaGuid]::Tables, $null)
    $Tables = $Schema | Where-Object { $_.TABLE_TYPE -eq 'TABLE' -and $_.TABLE_NAME -notlike 'MSys*' -and $_.TABLE_NAME -notlike 'f_*' -and $_.TABLE_NAME -notlike '~*' } | Select-Object -ExpandProperty TABLE_NAME

    foreach ($table in $Tables) {
        Write-Host "Exportando tabla: $table"
        $CsvPath = Join-Path $ExportFolder "$table.csv"
        
        $Command = $Connection.CreateCommand()
        $Command.CommandText = "SELECT * FROM [$table]"
        
        try {
            $Reader = $Command.ExecuteReader()
            $SchemaTable = $Reader.GetSchemaTable()
            $Columns = @()
            if ($null -ne $SchemaTable) {
                foreach ($row in $SchemaTable.Rows) {
                    $Columns += $row.ColumnName
                }
            }
            
            $Writer = New-Object System.IO.StreamWriter($CsvPath, $false, [System.Text.Encoding]::UTF8)
            $HeaderLine = ($Columns | ForEach-Object { "`"$_`"" }) -join ","
            $Writer.WriteLine($HeaderLine)
            
            $rowCount = 0
            while ($Reader.Read()) {
                $RowValues = @()
                for ($i = 0; $i -lt $Columns.Count; $i++) {
                    try {
                        $val = $Reader.GetValue($i)
                        if ($val -is [System.DBNull]) {
                            $RowValues += ""
                        } elseif ($val -is [byte[]]) {
                            $RowValues += "`"[DATOS BINARIOS]`""
                        } else {
                            $strVal = $val.ToString().Replace("`"", "`"`"").Replace("`r", "").Replace("`n", "\n")
                            $RowValues += "`"$strVal`""
                        }
                    } catch {
                        $RowValues += "`"[ERROR O TIPO NO SOPORTADO]`""
                    }
                }
                $Writer.WriteLine(($RowValues -join ","))
                $rowCount++
            }
            $Writer.Close()
            $Reader.Close()
            Write-Host " -> OK ($rowCount filas exportadas)"
        } catch {
            Write-Host " -> Error al leer tabla $table : $($_.Exception.Message)"
        }
    }
} catch {
    Write-Host "Error de conexión OLEDB: $($_.Exception.Message)"
} finally {
    if ($Connection.State -eq 'Open') { $Connection.Close() }
}
