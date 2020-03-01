interface MeterReading {
    id: number;
    t1Value: number;
    t2Value: number;
    t3Value: number;
    date: Date;
    addedDate: Date;
    error: string;
    statusId: number;
    period: Date
}