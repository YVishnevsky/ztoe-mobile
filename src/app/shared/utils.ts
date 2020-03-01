export function GetZoneNames(zoneCount: number): Array<string> {
    let zoneNames: Array<string> = [];
    switch (zoneCount) {
        case 2:
            zoneNames.push('День');
            zoneNames.push('Ніч');
            break;

        case 3:
            zoneNames.push('Пік');
            zoneNames.push('Напівпік');
            zoneNames.push('Ніч');
            break;

        default:
            zoneNames.push('Покази');
    }
    
    return zoneNames;
}