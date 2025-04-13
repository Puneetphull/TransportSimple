import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TripFlowService } from '../common/trip-flow.service';
import { Trip } from '../common/interface';
import * as d3 from 'd3';

@Component({
  selector: 'trip-route',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './trip-route.component.html',
  styleUrl: './trip-route.component.scss',
})
export class TripRouteComponent {
  tripDetail: Trip[] = [];
  @ViewChild('svgContainer') svgContainer!: ElementRef;
  constructor(private tripFlowService: TripFlowService) {
    this.tripFlowService.getTripDetial().pipe().subscribe((res: Trip[]) => {
      if (res.length) {
        this.tripDetail = [...res];
        this.renderTrips(this.tripDetail);
      }
    })
  }



  renderTrips(tripDetail: Trip[]) {
    const svg = d3.select(this.svgContainer.nativeElement);
    svg.selectAll('*').remove();

    const width = 1200;
    const height = 300;
    const margin = 40;
    const spacing = 180;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    svg.append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 10)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', 'steelblue');

    const yBase = 100;
    const curveOffsetY = 60;


    tripDetail.forEach((trip, index) => {
      const x1 = index * spacing;
      const x2 = (index + 1) * spacing;
      const y1 = yBase;
      const color = trip.level === 2 ? 'orange' : 'steelblue';

      if (trip.showCurve) {
        const startX = 0;
        const startY = 180;
        const endX = x1;
        const endY = y1;

        const amplitude = 20; // Adjust wave height
        const steps = 100; // Smoothness of the wave

        const dx = endX - startX;
        const dy = endY - startY;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx); // Angle in radians

        // Build sine wave in horizontal direction first
        const path = d3.path();
        path.moveTo(0, 0);

        // Create exactly one complete sine wave cycle
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const x = t * length;
          const y = amplitude * Math.sin(2 * Math.PI * t); // One full cycle (2π)
          path.lineTo(x, y);
        }

        // Create the sine path and rotate it into position
        g.append('path')
          .attr('d', path.toString())
          .attr('fill', 'none')
          .attr('stroke', color)
          .attr('stroke-width', 2)
          .attr('marker-end', 'url(#arrow)')
          .attr('transform', `
            translate(${startX}, ${startY})
            rotate(${(angle * 180) / Math.PI})`);
          }
       else {
        if (index !== 0) {
          g.append('line')
            .attr('x1', (index - 1) * spacing)
            .attr('y1', y1)
            .attr('x2', (index - 1 + 1) * spacing)
            .attr('y2', y1)
            .attr('stroke', color)
            .attr('stroke-width', 2)
            .attr('marker-end', trip.showArrow ? 'url(#arrow)' : null);
        }
      }
      g.append('circle')
        .attr('cx', x1)
        .attr('cy', y1)
        .attr('r', 6)
        .attr('fill', 'white')
        .attr('stroke', color)
        .attr('stroke-width', 2);
      g.append('text')
        .attr('x', x1)
        .attr('y', y1 - 15)
        .attr('text-anchor', 'middle')
        .attr('font-size', 12)
        .attr('fill', color)
        .text(trip.abbrevation);
    });
  }
}

