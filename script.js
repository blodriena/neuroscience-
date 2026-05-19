(function() {
      const canvas = document.getElementById('neuronCanvas');
      const ctx = canvas.getContext('2d');
      let width, height;
      let particles = [];
      const PARTICLE_COUNT = 110; 


      
      function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      }
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      class NeuronParticle {
        constructor() {
          this.reset();
        }
        reset() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.vx = (Math.random() - 0.5) * 0.45;
          this.vy = (Math.random() - 0.5) * 0.45;
          this.radius = Math.random() * 2.2 + 1.2;
          this.alpha = Math.random() * 0.5 + 0.3;
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0 || this.x > width) this.vx *= -1;
          if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw(ctx) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
          ctx.fillStyle = `rgba(180, 160, 255, ${this.alpha})`;
          ctx.fill();
          // glow
          ctx.shadowColor = '#b392f0';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      for (let i=0; i<PARTICLE_COUNT; i++) {
        particles.push(new NeuronParticle());
      }

      function drawConnections() {
        for (let i=0; i<particles.length; i++) {
          for (let j=i+1; j<particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx*dx+dy*dy);
            if (dist < 110) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(160, 140, 230, ${0.12 * (1 - dist/110)})`;
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        }
      }

      function animateNeurons() {
        ctx.clearRect(0, 0, width, height);
        for (let p of particles) {
          p.update();
          p.draw(ctx);
        }
        drawConnections();
        requestAnimationFrame(animateNeurons);
      }
      animateNeurons();

      const brainImagePool = [
        "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582719471384-894fbb4c8a8b?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507146153580-69f9b2b23de7?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583911860205-72f8ac8aae3b?q=80&w=800&auto=format&fit=crop"
      ];

      function getBrainImage(index) {
        return brainImagePool[index % brainImagePool.length];
      }

      const articleTopics = [
        "Synaptic Plasticity Mechanisms","Dopamine Reward Pathways","Default Mode Network","Glial Cells & Cognition","Optogenetics Revolution",
        "Neurotransmitters & Mood","Hippocampal Memory Index","Cortical Columns","Brain-Computer Interfaces","Mirror Neurons",
        "Astrocytes in Learning","Myelination Dynamics","Pain Perception Pathways","Sleep Spindles & Memory","Neuroinflammation",
        "Cerebellar Motor Learning","Oxytocin & Social Bonding","Fear Conditioning","Neurogenesis in Adulthood","Circadian Rhythms",
        "Visual Cortex Processing","Auditory Pathway","Prefrontal Executive Function","Emotion Regulation","Language & Broca's Area",
        "Neuroeconomics","Consciousness Theories","Thalamocortical Loops","Basal Ganglia Action","Serotonin & Behavior",
        "Epigenetics in Brain","Gut-Brain Axis","Synesthesia","Neuroprosthetics","Deep Brain Stimulation",
        "Alzheimer's Mechanisms","Parkinson's Alpha-Synuclein","Autism Spectrum","Schizophrenia Dopamine","Multiple Sclerosis",
        "Migraine Cortical Spreading Depression","Epilepsy Seizure Dynamics","Stroke Recovery","Traumatic Brain Injury","Neuroethics",
        "Artificial Neural Networks","Brain Organoids","Psychedelics & Connectivity","fMRI Resting State","Diffusion Tensor Imaging"
      ];

      function generateArticleContent(index, title) {
        return `
          <h2 style="color:#e2dbff; margin-bottom:1rem;">${title}</h2>
          <p style="margin-bottom:1.2rem; color:#cbd5f0;">Neuroscience research continues to uncover the intricate mechanisms behind ${title.toLowerCase()}. Recent studies combining advanced imaging and molecular biology have revealed unprecedented details about neural circuit dynamics.</p>
          <p style="margin-bottom:1.2rem; color:#cbd5f0;">The ${title} field has seen breakthroughs involving multi-scale modeling. Scientists now understand that synaptic modifications depend on timing-dependent plasticity rules, while neuromodulators like acetylcholine set the gain of cortical processing.</p>
          <p style="margin-bottom:1.2rem; color:#cbd5f0;">Clinical implications are profound. Disorders ranging from depression to neurodegenerative conditions are being redefined through the lens of ${title.toLowerCase()}. Innovative therapies target specific receptor subtypes and utilize closed-loop stimulation.</p>
          <p style="margin-bottom:1.2rem; color:#cbd5f0;">Longitudinal studies with thousands of participants demonstrate that environmental enrichment and cognitive training can reshape the neural architecture associated with ${title}. This adaptive capacity offers hope for rehabilitation.</p>
          <p style="color:#cbd5f0;">Future directions include integrating machine learning with connectomic data to predict individual variability in ${title}. The intersection of computational neuroscience and clinical practice promises personalized interventions.</p>
        `;
      }

      const articlesArray = [];
      for (let i = 0; i < 50; i++) {
        const title = articleTopics[i % articleTopics.length] + (i >= articleTopics.length ? ` (Vol.${Math.floor(i/articleTopics.length)+1})` : "");
        const fullContent = generateArticleContent(i, title);
        articlesArray.push({
          id: i,
          title: title,
          excerpt: `Exploring the depths of ${title.toLowerCase()} — from molecular cascades to large-scale networks.`,
          image: getBrainImage(i),
          content: fullContent
        });
      }

      const container = document.getElementById('articlesContainer');
      function renderArticles() {
        container.innerHTML = articlesArray.map(article => `
          <div class="article-card" data-id="${article.id}">
            <div class="card-img" style="background-image: url('${article.image}');" data-action="open"></div>
            <div class="card-content">
              <h3 class="article-title">${article.title}</h3>
              <p class="article-excerpt">${article.excerpt}</p>
              <button class="read-more" data-action="open">Read Article</button>
            </div>
          </div>
        `).join('');
      }
      renderArticles();

      const modal = document.getElementById('articleModal');
      const modalBody = document.getElementById('modalBody');
      const closeBtn = document.getElementById('closeModalBtn');

      function openArticle(id) {
        const article = articlesArray.find(a => a.id == id);
        if (!article) return;
        modalBody.innerHTML = article.content;
        modal.style.display = 'flex';
      }

      function closeModal() {
        modal.style.display = 'none';
      }

      container.addEventListener('click', (e) => {
        const card = e.target.closest('.article-card');
        if (!card) return;
        const actionElement = e.target.closest('[data-action="open"]');
        if (actionElement) {
          const id = card.dataset.id;
          if (id) openArticle(id);
        }
      });

      closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
      });

    })();