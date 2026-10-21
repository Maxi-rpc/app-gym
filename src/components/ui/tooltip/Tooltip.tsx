import React from 'react';

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

type Props = {
    children?: React.ReactNode;
    message?: string;
    position?: TooltipPosition;
};

const positionClasses: Record<
    TooltipPosition,
    { tooltip: string; arrow: string }
> = {
    top: {
        tooltip: 'bottom-full left-1/2 mb-3 -translate-x-1/2',
        arrow: '-bottom-1.5 left-1/2 -translate-x-1/2 border-r border-b',
    },
    right: {
        tooltip: 'left-full top-1/2 ml-3 -translate-y-1/2',
        arrow: 'top-1/2 -left-1.5 -translate-y-1/2 border-l border-b',
    },
    bottom: {
        tooltip: 'top-full left-1/2 mt-3 -translate-x-1/2',
        arrow: '-top-1.5 left-1/2 -translate-x-1/2 border-l border-t',
    },
    left: {
        tooltip: 'right-full top-1/2 mr-3 -translate-y-1/2',
        arrow: 'top-1/2 -right-1.5 -translate-y-1/2 border-r border-t',
    },
};

export default function Tooltip({
    children,
    message,
    position = 'top',
}: Props) {
    const tooltipId = React.useId();
    const positionClassNames = positionClasses[position];

    return (
        <div className="group relative inline-block">
            <span className="inline-flex" aria-describedby={tooltipId}>
                {children}
            </span>

            <div
                id={tooltipId}
                role="tooltip"
                className={`invisible absolute z-99999 whitespace-nowrap rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-medium text-gray-700 opacity-0 shadow-md transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white ${positionClassNames.tooltip}`}
            >
                {message}
                <div
                    className={`absolute h-3 w-3 rotate-45 border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 ${positionClassNames.arrow}`}
                />
            </div>
        </div>
    );
}
