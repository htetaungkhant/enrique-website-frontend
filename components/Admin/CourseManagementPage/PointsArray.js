import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const PointsArray = ({ name, index, isExtraDetails, isSubmitting }) => {
    const { watch, setValue, control } = useFormContext();
    const pointsPath = `${name}.${index}.points`;
    const points = watch(pointsPath) || [];

    const handleAdd = () => {
        setValue(pointsPath, [...points, ""]);
    };

    const handleRemove = (pointIndex) => {
        const newPoints = [...points];
        newPoints.splice(pointIndex, 1);
        setValue(pointsPath, newPoints);
    };

    return (
        <div className="space-y-2">
            {points.map((point, pointIndex) => (
                <div key={pointIndex} className="flex gap-2">
                    <FormField
                        control={control}
                        name={`${name}.${index}.points.${pointIndex}`}
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input
                                        placeholder="Add a note"
                                        {...field}
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {
                        isExtraDetails ? (
                            points.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemove(pointIndex)}
                                    className="h-10 w-10 cursor-pointer"
                                    disabled={isSubmitting}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )
                        )
                            : (
                                points.length > 0 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleRemove(pointIndex)}
                                        className="h-10 w-10 cursor-pointer"
                                        disabled={isSubmitting}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )
                            )
                    }
                </div>
            ))}
            <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 cursor-pointer"
                onClick={handleAdd}
                disabled={isSubmitting}
            >
                Add Note
            </Button>
        </div>
    );
};
