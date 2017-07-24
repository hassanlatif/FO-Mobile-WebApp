
export interface Alarms {
        TTStats: {
            Critical: number,
            High: number,
            Medium: number,
            Low: number
        },
        
        DSLStats: {
            Up: number,
            Down: number,
            SwitchedOff: number,
            Unknown: number
        },
        
        FTTXStats: {
            Up: number,
            Down: number,
            SwitchedOff: number,
            NeverConnectedOnt: number,
            Disabled: number,
            Disconnected: number,
            Unknown: number
        },

        UPEStats: {
            Up: number,
            Down: number
        },
        
        TechStats: {
            IP: number,
            DIA: number,
            DIAS: number,
            WDM: number,
            PLL: number,
            VPLS: number,
            CBLS: number
        },

}