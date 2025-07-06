import type { FC } from 'react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';

// Since this card is the only consumer, we define the drag item type locally instead of a separate file.
const ItemTypes = {
    CARD: 'card',
} as const;

const style: React.CSSProperties = {
    cursor: 'move',
};

export interface CardProps {
    id: any;
    text: string;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
    onClick?: () => void;
    isActive?: boolean;
}

interface DragItem {
    index: number;
    id: any;
    type: string;
}

const DragAndDropCard: FC<CardProps> = ({ id, text, index, moveCard, onClick, isActive }) => {
    const ref = useRef<HTMLDivElement>(null);

    // Drop target — handles when another card hovers over this card
    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>(() => ({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                console.log("dragIndex === hoverIndex");
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                console.log("dragIndex < hoverIndex && hoverClientY < hoverMiddleY");
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                console.log("dragIndex > hoverIndex && hoverClientY > hoverMiddleY");
                return
            }

            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        }
    }), [index, moveCard]);

    // Drag source
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: () => ({ id, index }),
        // Override isDragging so the element stays in dragging state even after reordering
        isDragging: (monitor) => id === monitor.getItem()?.id,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [id, index, id]);

    // While dragging, make the source element invisible (gap) to show drop location.
    const draggingStyle: React.CSSProperties = isDragging ? { visibility: 'hidden' } : {};

    drag(drop(ref));

    return (
        <div
            ref={ref}
            style={{ ...style, ...draggingStyle }}
            className={`list-group-item ${isActive ? 'active' : ''}`}
            data-handler-id={handlerId || undefined}
            onClick={onClick}
        >
            {text}
        </div>
    );
};

export default DragAndDropCard;