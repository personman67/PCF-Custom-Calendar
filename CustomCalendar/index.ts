import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { CalendarComponent, ICalendarProps } from "./CustomCalendar";
import * as React from "react";
import * as ReactDOM from 'react-dom';

const STATUS_INIT: string = "initialized";
const STATUS_ERROR: string = "error";
const STATUS_ONCHANGE: string = "onchange";
const STATUS_ONRESET: string = "onreset";
const STATUS_COMPLETED: string = "completed";

export class CustomCalendar implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
    // PRIVATE: OnChange Event Variables
    private _updateFromOutput: boolean;

    // PUBLIC: OUTPUT Variables
    public _STATUS_Transaction: string;
    public _OUTPUT_EventDetails: string;

    //
    private _container: HTMLDivElement;
    private _context: ComponentFramework.Context<IInputs>;

    private _notifyOutputChanged: () => void;

    // REACT Variables
    private _props: ICalendarProps;

    /*
     Empty constructor.
    */
    constructor() {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
        // Initialize OnChange Event Variables
        this._updateFromOutput = false;

        // Initialize OUTPUT Variables
        this._OUTPUT_EventDetails = "{}";
        this._STATUS_Transaction = STATUS_INIT;

        //
        this._props = {
            value: "",
            onChange: this.notifyChange.bind(this)
        };

        // Capture CONTEXT, NOTIFY_OUTPUT_CHANGED, CONTAINER functions for PowerApps/PCF
        this._context = context;
        this._notifyOutputChanged = notifyOutputChanged;
        this._container = container;

        // Trigger PCF Output -> PowerApp
        this._notifyOutputChanged();
    }

    notifyChange(value: string) {
        this._OUTPUT_EventDetails = value;
        this._notifyOutputChanged();
        
    }



    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        {
            /*
            if (this._updateFromOutput) {
                this._updateFromOutput = false;
                return;
            }
            */
            /*var dataSet = context.parameters.calendarDataSet

            if (dataSet.loading) return; used later when dataset is implemented*/

            if (context.mode.allocatedHeight !== -1) {
                //if we are in a canvas app we need to resize the map to make sure it fits inside the allocatedHeight
                this._container.style.height = `${(context.mode.allocatedHeight - 25).toString()}px`;

                //Setting the page size in a Canvas app works on the first load of the component.  If you navigate
                // away from the page on which the component is located though the paging get reset to 25 when you
                // navigate back.  In order to fix this we need to reset the paging to the count of the records that
                // will come back and do a reset on the paging.  I believe this is all due to a MS bug.
                //dataSet.paging.setPageSize(dataSet.paging.totalResultCount);
            }

            // Add code to update control view
            ReactDOM.render(
                React.createElement(CalendarComponent, this._props)
                , this._container
            );


        }
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {

        return {
            //STATUS_Transaction: this._STATUS_Transaction,
            OUTPUT_EventDetails: this._OUTPUT_EventDetails
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        ReactDOM.unmountComponentAtNode(this._container);
    }
}
