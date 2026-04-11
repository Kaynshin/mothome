#!/usr/bin/env node

/**
 * Performance Audit Script
 * Measures Core Web Vitals using Playwright
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';
const PAGES = ['/', '/404', '/error'];

class PerformanceAuditor {
  constructor() {
    this.results = [];
    this.browser = null;
  }

  async launch() {
    this.browser = await chromium.launch();
  }

  async auditPage(pageUrl) {
    const page = await this.browser.newPage();
    const metrics = {
      url: pageUrl,
      metrics: {},
      resources: {},
      images: {},
      timestamp: new Date().toISOString(),
    };

    try {
      // Navigation timing
      const startTime = Date.now();
      await page.goto(pageUrl, { waitUntil: 'networkidle', timeout: 30000 });
      const loadTime = Date.now() - startTime;

      // Collect navigation metrics
      const timingData = await page.evaluate(() => {
        const timing = window.performance.timing;
        const navigation = window.performance.navigation;
        return {
          navigationStart: timing.navigationStart,
          fetchStart: timing.fetchStart,
          domContentLoadedEventEnd: timing.domContentLoadedEventEnd,
          loadEventEnd: timing.loadEventEnd,
          responseEnd: timing.responseEnd,
          domInteractive: timing.domInteractive,
        };
      });

      metrics.metrics.loadTime = loadTime;
      metrics.metrics.domContentLoaded =
        timingData.domContentLoadedEventEnd - timingData.navigationStart;
      metrics.metrics.pageLoadTime = timingData.loadEventEnd - timingData.navigationStart;
      metrics.metrics.ttfb = timingData.responseEnd - timingData.fetchStart;

      // Collect resource metrics
      const resources = await page.evaluate(() => {
        const entries = window.performance.getEntriesByType('resource');
        const grouped = {
          total: entries.length,
          byType: {},
          totalSize: 0,
        };

        entries.forEach((entry) => {
          const type = entry.initiatorType || 'other';
          if (!grouped.byType[type]) {
            grouped.byType[type] = { count: 0, size: 0 };
          }
          grouped.byType[type].count++;
          grouped.byType[type].size += entry.transferSize || 0;
          grouped.totalSize += entry.transferSize || 0;
        });

        return grouped;
      });

      metrics.resources = resources;

      // Collect image data
      const imageData = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        return {
          total: images.length,
          withLazyLoading: images.filter((img) => img.loading === 'lazy').length,
          withSrcSet: images.filter((img) => img.srcset).length,
          sources: images.map((img) => ({
            src: img.currentSrc || img.src,
            lazy: img.loading === 'lazy',
            width: img.width,
            height: img.height,
          })),
        };
      });

      metrics.images = imageData;

      // Check for canvas (3D hero)
      const hasCanvas = await page.evaluate(() => document.querySelector('canvas') !== null);
      metrics.has3D = hasCanvas;

      console.log(`✅ Audited: ${pageUrl}`);
      console.log(`   Load Time: ${loadTime}ms`);
      console.log(`   Resources: ${resources.total} (${(resources.totalSize / 1024).toFixed(2)}KB)`);
      console.log(`   Images: ${imageData.total} (${imageData.withLazyLoading} lazy, ${imageData.withSrcSet} srcset)`);
      if (hasCanvas) console.log(`   3D Hero: YES`);

      this.results.push(metrics);
    } catch (error) {
      console.error(`❌ Failed to audit ${pageUrl}:`, error.message);
      metrics.error = error.message;
      this.results.push(metrics);
    } finally {
      await page.close();
    }
  }

  async runAudit() {
    console.log(`🔍 Starting Performance Audit\n`);
    console.log(`Base URL: ${BASE_URL}`);
    console.log(`Pages to audit: ${PAGES.join(', ')}\n`);

    for (const page of PAGES) {
      const url = `${BASE_URL}${page}`;
      await this.auditPage(url);
    }
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      baseUrl: BASE_URL,
      summary: this._generateSummary(),
      details: this.results,
      recommendations: this._generateRecommendations(),
    };

    return report;
  }

  _generateSummary() {
    const summary = {
      totalPages: this.results.length,
      successfulAudits: this.results.filter((r) => !r.error).length,
      failedAudits: this.results.filter((r) => r.error).length,
      averageLoadTime:
        this.results.reduce((sum, r) => sum + (r.metrics.loadTime || 0), 0) /
        this.results.filter((r) => !r.error).length,
      totalResources: this.results.reduce((sum, r) => sum + (r.resources.total || 0), 0),
      totalResourceSize: this.results.reduce((sum, r) => sum + (r.resources.totalSize || 0), 0),
      totalImages: this.results.reduce((sum, r) => sum + (r.images.total || 0), 0),
      lazyLoadedImages: this.results.reduce((sum, r) => sum + (r.images.withLazyLoading || 0), 0),
      pagesWithSrcSet: this.results.filter(
        (r) => r.images && r.images.withSrcSet && r.images.withSrcSet > 0
      ).length,
      pagessWith3D: this.results.filter((r) => r.has3D).length,
    };

    return summary;
  }

  _generateRecommendations() {
    const summary = this._generateSummary();
    const recommendations = [];

    // Average load time recommendations
    if (summary.averageLoadTime > 2500) {
      recommendations.push({
        severity: 'high',
        category: 'Performance',
        issue: `Average page load time is ${summary.averageLoadTime.toFixed(0)}ms (target: <2500ms)`,
        suggestions: [
          'Optimize images with WebP/AVIF format',
          'Implement code splitting and lazy loading',
          'Reduce JavaScript bundle size',
          'Enable compression and caching',
        ],
      });
    }

    // Image optimization
    const lazyLoadPercentage = (summary.lazyLoadedImages / summary.totalImages) * 100;
    if (lazyLoadPercentage < 50) {
      recommendations.push({
        severity: 'medium',
        category: 'Images',
        issue: `Only ${lazyLoadPercentage.toFixed(0)}% of images use lazy loading`,
        suggestions: [
          'Add loading="lazy" attribute to below-the-fold images',
          'Implement responsive images with srcset',
          'Use modern image formats (WebP/AVIF)',
        ],
      });
    }

    // Resource size
    const resourceSizeMB = summary.totalResourceSize / (1024 * 1024);
    if (resourceSizeMB > 5) {
      recommendations.push({
        severity: 'high',
        category: 'Bundle Size',
        issue: `Total resource size is ${resourceSizeMB.toFixed(2)}MB`,
        suggestions: [
          'Analyze and split large bundles',
          'Remove unused dependencies',
          'Enable minification and compression',
          'Consider dynamic imports for large libraries',
        ],
      });
    }

    return recommendations;
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Main execution
async function main() {
  const auditor = new PerformanceAuditor();

  try {
    await auditor.launch();
    await auditor.runAudit();

    const report = auditor.generateReport();

    // Output report
    console.log('\n' + '='.repeat(60));
    console.log('📊 PERFORMANCE AUDIT REPORT');
    console.log('='.repeat(60) + '\n');

    console.log('Summary:');
    console.log('---------');
    const summary = report.summary;
    console.log(`Pages Audited: ${summary.successfulAudits}/${summary.totalPages}`);
    console.log(`Average Load Time: ${summary.averageLoadTime.toFixed(0)}ms`);
    console.log(`Total Resources: ${summary.totalResources}`);
    console.log(`Total Resource Size: ${(summary.totalResourceSize / 1024).toFixed(2)}KB`);
    console.log(`Total Images: ${summary.totalImages}`);
    console.log(`Lazy Loaded: ${summary.lazyLoadedImages}/${summary.totalImages}`);
    console.log(`With SrcSet: ${summary.pagesWithSrcSet}/${summary.totalPages}`);
    console.log(`With 3D Hero: ${summary.pagessWith3D}/${summary.totalPages}`);

    if (report.recommendations.length > 0) {
      console.log('\n' + '-'.repeat(60));
      console.log('Recommendations:');
      console.log('-'.repeat(60));

      report.recommendations.forEach((rec) => {
        console.log(
          `\n[${rec.severity.toUpperCase()}] ${rec.category}: ${rec.issue}`
        );
        rec.suggestions.forEach((suggestion) => {
          console.log(`  • ${suggestion}`);
        });
      });
    }

    // Save report to file
    const reportPath = path.join(process.cwd(), 'performance-audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n✅ Report saved to ${reportPath}`);
  } finally {
    await auditor.cleanup();
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
