import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef(({ className, ...props }, ref) => (
    <div className="yesrelative yesw-full yesoverflow-auto">
        <table
            ref={ref}
            className={cn("yesw-full yescaption-bottom yestext-sm", className)}
            {...props} />
    </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:yesborder-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn("[&_tr:last-child]:yesborder-0", className)}
        {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={cn(
            "yesborder-t yesbg-muted/50 yesfont-medium [&>tr]:last:yesborder-b-0",
            className
        )}
        {...props} />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn(
            "yesborder-b yestransition-colors hover:yesbg-muted/50 data-[state=selected]:yesbg-muted",
            className
        )}
        {...props} />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn(
            "yesh-10 yespx-2 yestext-left yesalign-middle yesfont-medium yestext-muted-foreground [&:has([role=checkbox])]:yespr-0 [&>[role=checkbox]]:yestranslate-y-[2px]",
            className
        )}
        {...props} />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn(
            "yesp-2 yesalign-middle [&:has([role=checkbox])]:yespr-0 [&>[role=checkbox]]:yestranslate-y-[2px]",
            className
        )}
        {...props} />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={cn("yesmt-4 yestext-sm yestext-muted-foreground", className)}
        {...props} />
));
TableCaption.displayName = "TableCaption";

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
};
