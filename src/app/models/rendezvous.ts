export interface Rendezvous {
    order?: number;
    rdvID?: string;
    displayName: string;
    phoneNumber: string;
    created_by: string;
    created_at: Date;
    lastUpdate?: Date | 'Not updated';
}