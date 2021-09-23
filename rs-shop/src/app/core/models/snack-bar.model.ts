import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export interface SnackBarConfig {
  horizontalPosition: MatSnackBarHorizontalPosition,
  verticalPosition: MatSnackBarVerticalPosition,
  duration: number,
}

export interface SnackBar {
  CONFIG: SnackBarConfig,
  ACTION: string,
}
